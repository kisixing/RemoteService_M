import React, { useState, useEffect } from 'react';
// import useService from "./useService";
import { useIm } from "@lianmed/im";
import Contact from "./components/Contact";
interface IProps { }



export default (props: IProps) => {
  const { friends, contacts } = useIm()
  console.log('con',contacts)
  return (
    <div >
      <div style={{ position: 'absolute', left: 0, bottom: 0, top: 0, width: 200 }}>
        <Contact items={contacts} />
      </div>
      <div style={{ marginLeft: 300 }}>
        <span></span>
      </div>
    </div>
  );
};
