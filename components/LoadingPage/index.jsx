import { LinearProgress } from "@mui/material";
import Image from "next/image";
import React from "react";
import style from './style.module.css';

const LoadingPage = () => {
  return (
    <div className={style.page_wrapper}>
      <div className={style.content}>
        <Image
          src="/full_logo.png"
          width={140}
          height={140}
          objectFit="contain"
          alt="Logo"
        />
        <LinearProgress sx={{ width: 200, mt: 4 }} />
      </div>
    </div>
  );
};

export default LoadingPage;
