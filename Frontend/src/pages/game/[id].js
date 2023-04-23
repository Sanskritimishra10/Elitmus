import AllGames from "@/components/game/AllGames";
import React from "react";


const id = ({ data }) => {

  return (
    <AllGames gameId={data?._id} />
  );
};

export async function getStaticProps({ params }) {
  const fetchData = await fetch(
    `https://elitmusbackend-6bsu.onrender.com/get-games`
  );
  const parsedData = await fetchData.json();

  let data = {};
  parsedData?.data?.map((e, i) => {
    if (e._id == params.id) {
      data = e;
    }
  });
  return {
    props: {
      data,
    },
  };
}

export async function getStaticPaths() {
  const object = {
    paths: [],
    fallback: true,
  };
  const data = await fetch(
    `https://elitmusbackend-6bsu.onrender.com/get-games`
  );
  const parsedData = await data.json();

  parsedData?.data?.map((e, i) => {
    object.paths.push({
      params: {
        id: e._id,
      },
    });
  });
  return object;
}

export default id;
