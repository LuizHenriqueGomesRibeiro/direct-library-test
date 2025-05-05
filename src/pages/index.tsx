import { BreedHoundImagesDataProps, clientQueriesObject, serverQueriesObject } from "@/api-query-objects";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const getServerSideProps = async () => {
  const response = await serverQueriesObject.breed_hound_images();

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
  const { makeRequest, data, status } = clientQueriesObject.breed_image();
  const url = data?.message;
  
  return <div
    className={`${geistSans.className} ${geistMono.className} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
  >
    <div>
      {url && <img src={url} alt="" />}
      <button className="bg-red-500 rounded-2xl px-2 cursor-pointer" onClick={() => makeRequest({
        email: 'luis1234',
        password: 'luis1234'
      })}>make request</button>
      <div>request status: {status}</div>
    </div>
    {/* {list && list.message.map(element => <div>
      <img src={element} alt="" width={20} height={20} />
    </div>)} */}
  </div>
}