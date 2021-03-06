export interface RecentMatches {
    match_id: number,
    player_slot: number,
    radiant_win: boolean,
    duration: number,
    game_mode: number,
    lobby_type: number,
    hero_id: number,
    start_time: number,
    version: number,
    kills: number,
    deaths: number,
    assists: number,
    skill: number,
    xp_per_min: number,
    gold_per_min: number,
    hero_damage: number,
    tower_damage: number,
    hero_healing: number,
    last_hits: number,
    lane: number,
    lane_role: number,
    is_roaming: boolean,
    cluster: number,
    leaver_status: number,
    party_size: number,
    //extra data after API call
    hero_image: string,
    game_mode_name: string,
    lobby_type_name: string,
    items: number[];
    neutral_item: number[];
    win: boolean;
}

export interface LobbyType {
    id: number,
    name: string,
    localized_name: string,
}

export interface GameMode {
    id: number,
    name: string,
    localized_name: string,
}

export interface MatchDetail {
    match_id: number,
    players: Player[];
}

export interface Player {
    account_id: number;
    item_0: number;
    item_1: number;
    item_2: number;
    item_3: number;
    item_4: number;
    item_5: number;
    backpack_0: number;
    backpack_1: number;
    backpack_2: number;
    item_neutral: number;
}