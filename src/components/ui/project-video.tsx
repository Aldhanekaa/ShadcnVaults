"use client";

import React, { useRef, useState } from "react";
import { VideoIcon, XIcon } from "lucide-react";
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogClose,
} from "@/components/ui/morphing-dialog";
import { Badge } from "./badge";

export default function ProjectVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    videoRef.current?.play();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    videoRef.current?.pause();
    videoRef.current!.currentTime = 0;
  };

  return (
    <MorphingDialog
      transition={{
        type: "spring",
        bounce: 0,
        duration: 0.3,
      }}
    >
      <MorphingDialogTrigger className="overflow-hidden cursor-pointer relative rounded-2xl bg-white p-0 border-1 border-zinc-200/50 border-inset  dark:border-zinc-200">
        <video
          ref={videoRef}
          src={src}
          loop
          muted
          playsInline
          className="aspect-video w-full h-full rounded-2xl "
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
        <Badge className="absolute top-3 left-3" variant="secondary">
          <VideoIcon />
          Video
        </Badge>
      </MorphingDialogTrigger>
      <MorphingDialogContainer className=" z-30">
        <MorphingDialogContent className="z-30 py-6 px-2  relative aspect-video rounded-2xl bg-zinc-50 ring-1 ring-zinc-200/50 ring-inset dark:bg-white dark:ring-zinc-800/50">
          <div className="w-full h-full box-border">
            <video
              src={src}
              autoPlay
              loop
              muted
              playsInline
              className="aspect-video h-[70vh] md:h-[55vh] -mt-5  w-full rounded-2xl"
            />
          </div>
        </MorphingDialogContent>
        <MorphingDialogClose
          className="fixed top-6 right-6 h-fit w-fit rounded-full bg-white p-1"
          variants={{
            initial: { opacity: 0 },
            animate: {
              opacity: 1,
              transition: { delay: 0.3, duration: 0.1 },
            },
            exit: { opacity: 0, transition: { duration: 0 } },
          }}
        >
          <XIcon className="h-5 w-5 text-zinc-500" />
        </MorphingDialogClose>
      </MorphingDialogContainer>
    </MorphingDialog>
  );
}
