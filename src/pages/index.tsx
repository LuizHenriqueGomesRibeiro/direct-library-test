import caucolum, { BreedHoundImagesDataProps } from "@/api-query-objects";

export const getServerSideProps = async () => {
  const response = await caucolum.server.breed_hound_images();

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
  const { makeRequest, data, status } = caucolum.client.breed_image();
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
      <img src={element} alt="" width={20} height={20} />
    </div>)}
  </div>
}