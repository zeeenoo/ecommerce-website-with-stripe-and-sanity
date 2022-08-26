import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
//here we can ue the client to get the data from the sanity database
export const client = sanityClient({
    projectId: 'kkcfc8hi',
    dataset: 'production',
    apiVersion:'2022-08-21', // use the latest API version available
    useCdn: true, // `false` if you want to ensure fresh data 
    token:process.env.NEXT_PUBLIC_SANITY_TOKEN // or leave blank to be anonymous user
});
const builder = imageUrlBuilder(client);//this is the image url builder function that we can use to get the image url from the sanity database
export const urlFor = (source) => { //
    return builder.image(source); //
}











