export interface ProfileInfo {
    tracked_until: string,
    solo_competitive_rank: string,
    competitive_rank: string,
    rank_tier: number,
    leaderboard_rank: number,
    mmr_estimate: {},
    profile: Profile,
}

export interface Profile {
    account_id: number,
    personaname: string,
    name: string,
    plus: boolean,
    cheese: number,
    steamid: string,
    avatar: string,
    avatarmedium: string,
    avatarfull: string,
    profileurl: string,
    last_login: string,
    loccountrycode: string,
    is_contributor: boolean;
}

export interface SimplifiedProfile {
    profileName?: string;
    profilePersonaName?: string;
    profilePic?: string;
    profileUrl?: string;
    personUid?: number;
}