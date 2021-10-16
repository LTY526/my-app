export interface ItemApiResponse {
    result: {
      items: DotaItem[];
      status: number;
    }
}

export interface DotaItem {
    cost: number;
    id: number;
    localized_name: string;
    name: string;
    recipe: any;
    secret_shop: any;
    side_shop: any;
}