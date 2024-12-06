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

    /**
     * Retrieves the recent subreddits as a readonly signal
     * @returns A readonly signal containing the recent subreddits
     */
    get getRecentSubreddits() {
        return this.recentSubreddits.asReadonly()
    }

    /**
     * Retrieves the favorite subreddits as a readonly signal
     * @returns A readonly signal containing the favorite subreddits
     */
    get getFavoriteSubreddits() {
        return this.favoriteSubreddits.asReadonly()
    }

    /**
     * Synchronizes the recent subreddits from local storage
     */
    syncRecentSubreddits() {
        const stored = localStorage.getItem(this.RECENT_SUBREDDITS_KEY);
        this.recentSubreddits.set(stored ? JSON.parse(stored) : [])
    }

    /**
     * Synchronizes the favorite subreddits from local storage
     */
    syncFavoriteSubreddits() {
        const stored = localStorage.getItem(this.FAVORITE_SUBREDDITS_KEY)
        this.favoriteSubreddits.set(stored ? JSON.parse(stored) : [])
    }

    /**
     * Adds a recent subreddit to local storage
     * @param subreddit The subreddit to add
     */
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

    /**
     * Adds a favorite subreddit to local storage
     * @param subreddit The subreddit to add
     */
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

    /**
     * Removes a favorite subreddit from local storage
     * @param subredditName The name of the subreddit to remove
     */
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
