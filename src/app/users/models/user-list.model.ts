import { UserInfoModel } from "./user-info.model";

export interface UserListModel {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: UserInfoModel[];
}