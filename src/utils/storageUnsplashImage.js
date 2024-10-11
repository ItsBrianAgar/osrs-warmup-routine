import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.REACT_APP_UNSPLASH_ACCESS_KEY,
});

const STORAGE_KEY = "unsplash_daily_image";

const fetchDailyImage = async () => {
  const storedData = localStorage.getItem(STORAGE_KEY);
  const currentDate = new Date().toDateString();

  if (storedData) {
    const { date, imageUrl } = JSON.parse(storedData);
    if (date === currentDate) {
      return imageUrl;
    }
  }

  try {
    const result = await unsplash.photos.getRandom({
      query: "nature",
      orientation: "landscape",
    });

    if (result.response) {
      const imageUrl = result.response.urls.regular;
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          date: currentDate,
          imageUrl,
        })
      );
      return imageUrl;
    } else {
      console.error("Failed to fetch image:", result.errors);
      return null;
    }
  } catch (error) {
    console.error("Error fetching background image:", error);
    return null;
  }
};

export default fetchDailyImage;
