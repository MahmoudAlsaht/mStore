"use server";

export async function trimAndNormalizeProductData(
  dataToModify: any | string,
): Promise<any | string> {
  if (typeof dataToModify === "string") {
    return dataToModify.trim().replace(/\s+/g, " ");
  }
  if (typeof dataToModify !== "object" || dataToModify === null) {
    return "";
  }
  return {
    ...dataToModify,
    name: dataToModify.name?.trim().replace(/\s+/g, " ") ?? "",
    body: dataToModify.body?.trim().replace(/\s+/g, " ") ?? "",
    category: dataToModify.category?.trim().replace(/\s+/g, " ") ?? undefined,
    brand: dataToModify.brand?.trim().replace(/\s+/g, " ") ?? undefined,
    barCode: dataToModify.barCode?.toString() ?? undefined,
  };
}
