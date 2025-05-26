import { BreedHoundImagesDataProps } from "@/api-query-objects/types";
import { caucolum } from "@/api-query-objects";

const { client, server } = caucolum;

export const getServerSideProps = async () => {
  const response = await server.breed_hound_images();

  return {
    props: {
      list: response,
    }
  }
}

interface HomePageProps {
  list: BreedHoundImagesDataProps,
}

export default function Home({ list }: HomePageProps) {
  const { makeRequest, data, status } = client.breed_image();
  const url = data?.message;
  return <div>
    <div>
      {url && <img src={url} alt="" />}
      <button className="bg-red-500 rounded-2xl px-2 cursor-pointer" onClick={() => makeRequest({
        email: 'luis1234',
        password: 'luis1234'
      })}>make request</button>
      <div>request status: {status}</div>
    </div>
    {list && list.message.map(element => <div>
      <img src={element} alt="" width={100} height={100} />
    </div>)}
  </div>
}