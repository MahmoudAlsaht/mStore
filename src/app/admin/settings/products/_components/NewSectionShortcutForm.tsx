import SubmitButton from "@/components/SubmitButton";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Dialog, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import { Loader2, PlusCircle, X } from "lucide-react";
import {
  ChangeEvent,
  ChangeEventHandler,
  Dispatch,
  FormEvent,
  SetStateAction,
  useRef,
  useState,
  useTransition,
} from "react";
import { createSection } from "../_actions/createSection";

export default function NewSectionShortcutForm({
  type,
  setSection,
}: {
  type: string;
  setSection: Dispatch<
    SetStateAction<
      | {
          name: string;
          id: string;
        }
      | undefined
    >
  >;
}) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [res, setRes] = useState<string | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    startTransition(async () => {
      const formData = new FormData();
      if (!selectedImage) {
        console.log("!selectedImage");
        return;
      }
      console.log(nameRef.current?.value);
      formData.append("image", selectedImage);
      formData.append("name", nameRef.current?.value as string);
      formData.append("type", type);
      const res = await createSection(formData);
      if (
        [
          "nameError",
          "typeError",
          "imageError",
          "duplicate",
          "errorUpload",
          "errorCreateSection",
        ].indexOf(res) !== -1
      ) {
        setRes(res);
        setSection(undefined);
        console.log(res);
        return;
      }
      console.log(res);
      setSection({ name: res.split(" ")[1], id: res.split(" ")[0] });
      setOpen(false);
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target?.files) return;
    setSelectedImage(e.target.files[0]);
  };

  return (
    <Dialog open={open} onOpenChange={() => setOpen(true)}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="mb-2 flex w-full gap-2 border-rayanPrimary-dark text-rayanPrimary-dark"
        >
          اضافة {type === "brand" ? "علامة" : "فئة"}
          <PlusCircle />
        </Button>
      </DialogTrigger>
      <DialogContent showClose={false}>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setOpen(false)}
          className={
            "absolute right-4 top-4 rounded-sm border-destructive text-destructive opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          }
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
        <DialogHeader>
          <DialogTitle>اضافة {type === "brand" ? "علامة" : "فئة"}</DialogTitle>
        </DialogHeader>

        <div className="group relative z-0 mb-5 w-full">
          <input
            type="text"
            id="name"
            className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:focus:border-blue-500"
            placeholder=""
            ref={nameRef}
          />
          <label
            htmlFor="name"
            className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
          >
            الاسم{" "}
          </label>
        </div>

        <div className="group relative z-0 mb-5 w-full">
          <label className="mb-2 block text-gray-900" htmlFor="image">
            تحميل صورة {type === "brand" ? "العلامة" : "الفئة"}
          </label>
          <input
            className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
            id="image"
            type="file"
            onChange={handleChange}
          />
          <p className="text-rayanWarning-dark">min width: 241.33px</p>
          <p className="text-rayanWarning-dark">min height: 176px</p>
        </div>

        {res && (
          <div className="m-1 text-destructive">
            {res === "duplicate"
              ? `${type === "brand" ? "العلامة" : "الفئة"} موجودة بالفعل`
              : res === "nameError"
                ? "تأكد من حقل الاسم"
                : res === "imageError"
                  ? "تأكد من حقل الصورة"
                  : ["typeError", "errorUpload", "errorCreateSection"].indexOf(
                      res,
                    ) >= 0 &&
                    "هناك مشكلة في إنشاء هذا القسم يرجى المحاولة لاحقاََ"}
          </div>
        )}

        <Button
          onClick={handleClick}
          type="submit"
          disabled={isPending}
          className="w-full"
        >
          {isPending ? <Loader2 className="animate-spin" /> : "اضافة"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
