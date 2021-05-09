export interface CRUD {
  list: (limit: number, page: number) => Promise<any>;
  create: (resource: any) => Promise<any>;
  putByID: (id: string, resource: any) => Promise<string>;
  readByID: (id: string) => Promise<any>;
  deleteByID: (id: string) => Promise<string>;
  patchByID: (id: string, resource: any) => Promise<string>;
}
