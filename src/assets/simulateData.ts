const animeTitles = ['Naruto', 'Attack on Titan', 'Demon Slayer', 'Black Clover', 'Jujutsu Kaisen', 'Dragon Ball Z']
export const simulateData = () => {
    const randomAnime = Math.floor(Math.random() * animeTitles.length);
    const anime = animeTitles[randomAnime];
    const viewerCount = Math.floor(Math.random() * 10000) +1000;
    const avgWatchTime = Math.floor(Math.random() * 60) + 10;
    return {anime, viewerCount, avgWatchTime};
}