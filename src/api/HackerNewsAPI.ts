import axios, {AxiosResponse} from 'axios';
import {SCHEMA_SECURE, BASE_URL, API_VERSION_ZERO} from '../utils/constant';
import {User, Story, UserStory} from '../store/Types';

const URL = `${SCHEMA_SECURE}://${BASE_URL}/${API_VERSION_ZERO}`;

const getUser = async (id: string) => {
  try {
    const response: AxiosResponse<User> = await axios.get(
      `${URL}/user/${id}.json`,
    );

    return response.data;
  } catch (error) {
    console.log(`Error while getting a user with ${id}.`);
  }
};

const getStory = async (id: number) => {
  try {
    const response: AxiosResponse<Story> = await axios.get(
      `${URL}/item/${id}.json`,
    );

    return response.data;
  } catch (error) {
    console.log(`Error while getting a story with ${id}.`);
  }
};

const getUserStory = async (story: Story) => {
  try {
    const user: User = (await getUser(story.by)) as User;

    return {author: user, story: story};
  } catch (error) {
    console.log(`Error while getting ${story.by}'s story.`);
  }
};

export const getStoryIds = async (type: string) => {
  try {
    const response: AxiosResponse<[number]> = await axios.get(
      `${URL}/${type}stories.json`,
    );
    return response.data;
  } catch (error) {
    console.log(error);
    console.log('Error while getting list of stories.');
  }
};

export const getTopStories = async (max: number) => {
  try {
    const storyIds: [number] = (await getStoryIds('top')) as [number];
    const stories: [Story] = (await Promise.all(
      storyIds
        .sort(function () {
          return 0.5 - Math.random();
        })
        .slice(0, max)
        .map(getStory),
    )) as [Story];

    return stories;
  } catch (error) {
    console.log(`Error while getting random ${max} top stories.`);
  }
};

export const getUsersStories = async () => {
  try {
    const stories: [Story] = (await getTopStories(10)) as [Story];
    const usersStories: [UserStory] = (await Promise.all(
      stories.map(getUserStory),
    )) as [UserStory];

    return usersStories;
  } catch (error) {
    console.log('Error while getting users with top stories.');
  }
};
