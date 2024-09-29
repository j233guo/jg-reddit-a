import {Injectable, signal, WritableSignal} from '@angular/core';
import {ISubreddit} from "../data/models";

@Injectable({
    providedIn: 'root',
})
export class SubredditService {
    private readonly RECENT_SUBREDDITS_KEY = 'recentSubreddits'
    private readonly FAVORITE_SUBREDDITS_KEY = 'favoriteSubreddits'
    private readonly MAX_RECENT = 5

    private readonly recentSubreddits: WritableSignal<ISubreddit[]>
    private readonly favoriteSubreddits: WritableSignal<ISubreddit[]>

    constructor() {
        this.recentSubreddits = signal<ISubreddit[]>([])
        this.favoriteSubreddits = signal<ISubreddit[]>([])
        this.syncRecentSubreddits()
        this.syncFavoriteSubreddits()
    }

    get getRecentSubreddits() {
        return this.recentSubreddits.asReadonly()
    }

    get getFavoriteSubreddits() {
        return this.favoriteSubreddits.asReadonly()
    }

    syncRecentSubreddits() {
        const stored = localStorage.getItem(this.RECENT_SUBREDDITS_KEY);
        this.recentSubreddits.set(stored ? JSON.parse(stored) : [])
    }

    syncFavoriteSubreddits() {
        const stored = localStorage.getItem(this.FAVORITE_SUBREDDITS_KEY)
        this.favoriteSubreddits.set(stored ? JSON.parse(stored) : [])
    }

    addRecentSubreddit(subreddit: ISubreddit): void {
        const recentSubreddits = this.recentSubreddits()
        const updatedSubreddits = recentSubreddits.filter(
            (sub) => sub.name !== subreddit.name
        )
        updatedSubreddits.unshift(subreddit)
        localStorage.setItem(
            this.RECENT_SUBREDDITS_KEY,
            JSON.stringify(updatedSubreddits.slice(0, this.MAX_RECENT))
        )
        this.syncRecentSubreddits()
    }

    addFavoriteSubreddit(subreddit: ISubreddit): void {
        const favorites = this.favoriteSubreddits();
        if (!favorites.some((sub) => sub.name === subreddit.name)) {
            favorites.push(subreddit);
            localStorage.setItem(
                this.FAVORITE_SUBREDDITS_KEY,
                JSON.stringify(favorites)
            );
        }
        this.syncFavoriteSubreddits()
    }

    removeFavoriteSubreddit(subredditName: string): void {
        const favorites = this.favoriteSubreddits()
        const updatedFavorites = favorites.filter(
            (sub) => sub.name !== subredditName
        );
        localStorage.setItem(
            this.FAVORITE_SUBREDDITS_KEY,
            JSON.stringify(updatedFavorites)
        )
        this.syncFavoriteSubreddits()
    }
}
