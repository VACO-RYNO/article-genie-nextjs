import { useState, useEffect } from "react";
import axios from "axios";

import styled from "styled-components";
import PropTypes from "prop-types";

import SiteListEntry from "../SiteListEntry";

function SiteList({ siteTheme }) {
  const [recommendedSites, setRecommendedSites] = useState([]);

  useEffect(() => {
    const getRecommendedSites = async () => {
      const { data } = await axios.get("/data.json");

      setRecommendedSites(data.sites);
    };

    getRecommendedSites();
  }, []);

  return (
    <GridWrapper>
      <ThemeTitle>{siteTheme}</ThemeTitle>
      {recommendedSites
        .filter(site => site.theme === siteTheme)
        .map((site, index) => (
          <SiteListEntry
            key={index}
            name={site.name}
            originUrl={site.originUrl}
            logoUrl={site.logoUrl}
          ></SiteListEntry>
        ))}
    </GridWrapper>
  );
}

SiteList.propTypes = {
  sites: PropTypes.array,
};

const ThemeTitle = styled.h3`
  color: #000;
  font-size: 20px;
  font-weight: 400;
  line-height: 27px;
  padding: 0 33px;
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-row-gap: 20px;
  min-width: 400px;
  margin: 30px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 6px 10px 0 rgb(0 0 0 / 8%), 0 0 2px 0 rgb(0 0 0 / 15%);
  overflow: hidden;
  padding: 32px 0 24px;
`;

export default SiteList;
