import { getFetchClient } from "@strapi/strapi/admin";

// `slug` cần cho việc cảnh báo URL sẽ đổi khi chuyển cha (xem Task 10).
export type TreeNode = { documentId: string; title: string; slug: string; order: number };
export type CategoryNode = TreeNode & { products: TreeNode[] };
export type ParentNode = TreeNode & { children: CategoryNode[] };
// `orphanCategories`: Task 8 thêm nhánh này song song với `orphanProducts` —
// danh mục con chưa gán cha (hoặc cha đã bị xoá), kèm sản phẩm bên trong.
// Không khai ở đây thì những danh mục đó vô hình với editor.
export type TreeResponse = {
  parents: ParentNode[];
  orphanCategories: CategoryNode[];
  orphanProducts: TreeNode[];
};

export type ReorderPayload = {
  parents?: Array<{ documentId: string; order: number }>;
  categories?: Array<{ documentId: string; order: number; parentDocumentId: string }>;
  products?: Array<{ documentId: string; order: number; categoryDocumentId: string }>;
};

export async function fetchTree(): Promise<TreeResponse> {
  const { get } = getFetchClient();
  const { data } = await get("/sort-manager/tree");
  return data;
}

export async function saveOrder(payload: ReorderPayload): Promise<{ revalidated: boolean }> {
  const { put } = getFetchClient();
  const { data } = await put("/sort-manager/reorder", payload);
  return data;
}
