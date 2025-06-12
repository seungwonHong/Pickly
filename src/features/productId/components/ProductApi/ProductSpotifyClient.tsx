"use client";

import React from "react";

interface SpotifyButtonProps {
  artistName: string;
  albumName: string;
  product: any;
}

export default function ProductSpotifyClient({
  artistName,
  albumName,
  product,
}: SpotifyButtonProps) {
  const handleGoToSpotifyAlbum = async () => {
    if (!artistName || !albumName) {
      alert("아티스트나 앨범 정보가 없습니다.");
      return;
    }

    const res = await fetch("/api/spotify-token");
    const data = await res.json();
    const accessToken = data.access_token;

    const query = `album:${albumName} artist:${artistName}`;

    // 스포티파이 API를 사용하여 앨범 검색
    const albumRes = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        query
      )}&type=album&limit=1&market=KR`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    const albumData = await albumRes.json();

    // 앨범이 존재하는지 확인하면 해당 스포티파이 링크로 이동
    if (
      albumData.albums &&
      albumData.albums.items &&
      albumData.albums.items.length > 0
    ) {
      const albumId = albumData.albums.items[0].id;
      window.open(`https://open.spotify.com/album/${albumId}`, "_blank");
    } else {
      console.warn(
        "Spotify에서 해당 앨범을 찾을 수 없습니다. 해당 검색어와 관련된 곳으로 이동합니다."
      );

      const broaderQuery = `${artistName} ${albumName}`;
      const broaderAlbumRes = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(
          broaderQuery
        )}&type=album&limit=1&market=KR`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const broaderAlbumData = await broaderAlbumRes.json();

      if (
        broaderAlbumData.albums &&
        broaderAlbumData.albums.items &&
        broaderAlbumData.albums.items.length > 0
      ) {
        // 일반 검색으로 앨범을 찾은 경우
        const albumId = broaderAlbumData.albums.items[0].id;
        console.warn(
          "일반 검색으로 앨범을 찾았습니다. 해당 앨범 페이지로 이동합니다."
        );
        window.open(`https://open.spotify.com/album/${albumId}`, "_blank");
      } else {
        // 일반 검색으로도 앨범을 찾지 못한 경우, Spotify 검색 페이지로 이동
        console.warn(
          "Spotify에서 일반 검색으로도 앨범을 찾을 수 없습니다. 검색 페이지로 이동합니다."
        );
        window.open(
          `https://open.spotify.com/search/${encodeURIComponent(broaderQuery)}`,
          "_blank"
        );
      }
    }
  };

  return (
    <div
      onClick={handleGoToSpotifyAlbum}
      className="group cursor-pointer text-white flex flex-col items-center justify-end p-5 gap-2 bg-[#1F1F1F] rounded-lg hover:bg-[#282828] transition-all duration-300 ease-in-out"
    >
      <div className="relative w-[250px] h-[250px]">
        <img
          src={product.image}
          alt={`${artistName} - ${albumName}`}
          className="w-full h-full object-cover"
        />
        <span
          className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center absolute right-2 bottom-2 z-10
                   opacity-0 translate-y-4
                   transition-all duration-300 ease-in-out
                   group-hover:opacity-100 group-hover:translate-y-0"
        >
          <svg
            className="w-5 h-5 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon points="8,5 19,12 8,19" />
          </svg>
        </span>
      </div>

      <div className="flex flex-col items-start justify-center gap-1 w-full">
        <div>{albumName}</div>
        <div>{artistName}</div>
      </div>
    </div>
  );
}
