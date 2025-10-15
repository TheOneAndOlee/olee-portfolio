import {VITE_STEAM_API_KEY, VITE_STEAM_ID} from '$env/static/private';
import {error} from '@sveltejs/kit';

const cache = {
    timestamp: 0, 
    data: null,
    totalGames: 0
};

// 5 Hours
const CACHE_DURATION_MINUTES = 300;

const CACHE_DURATION_SECONDS = 60 * CACHE_DURATION_MINUTES;

export async function load() {
    const currentTime = Date.now();
    if (cache.data && (currentTime - cache.timestamp) < CACHE_DURATION_SECONDS * 1000) {
        return {
            recentGames: cache.data,
            totalGames: cache.totalGames,
            source: 'cache',
            lastUpdated: new Date(cache.timestamp).toLocaleString()
        };
    }

    const url = `http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${VITE_STEAM_API_KEY}&steamid=${VITE_STEAM_ID}&format=json`;
    
    const response = await fetch(url);

    if (!response.ok) {
        throw error(response.status, 'Failed to fetch data from Steam API');
    }

    const data = await response.json();
    const recentGames = data.response.games || [];
    const totalGames = data.response.total_count || 0;

    cache.timestamp = currentTime;
    cache.data = recentGames;
    cache.totalGames = totalGames;

    return {
        recentGames: recentGames,
        totalGames: totalGames,
        source: 'api',
        lastUpdated: new Date(currentTime).toLocaleString()
    };
}