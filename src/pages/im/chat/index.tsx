import React, { useState, useEffect } from 'react';
import useService from "./useService";
interface IProps { }

export default (props: IProps) => {
  useService()
  return (
    <div >
      <div style={{ position: 'absolute', left: 0, bottom: 0, top: 0, width: 300 }}>
        <span>123</span>
      </div>
      <div style={{ marginLeft: 300 }}>
        <span>123</span>
      </div>
    </div>
  );
};
