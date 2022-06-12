import { useState } from "react";
import { useRouter } from "next/router";

import styled from "styled-components";
import { BsSearch } from "react-icons/bs";

import useModal from "../../lib/hooks/useModal";

function AddressBar() {
  const [searchInput, setSearchInput] = useState("");

  const { showModal } = useModal();
  const router = useRouter();

  const handleChange = e => setSearchInput(e.target.value);

  const validURL = str => {
    const pattern = new RegExp(
      "^(https?:\\/\\/)?" +
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
        "(\\?[;&a-z\\d%_.~+=-]*)?" +
        "(\\#[-a-z\\d_]*)?$",
      "i",
    );

    return !!pattern.test(str);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!validURL(searchInput)) {
      showModal({
        modalType: "ConfirmModal",
        modalProps: {
          message: "올바른 URL 을 입력해주세요.",
        },
      });
      setSearchInput("");

      return router.push(`/`);
    }

    return router.push(`/genie-mode/?url=${searchInput}`);
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <SearchBarWrapper>
          <SearchBar
            type="text"
            value={searchInput}
            onChange={handleChange}
            placeholder="Enter a URL of the website."
            required
          />
          <SearchIcon onClick={handleSubmit} />
        </SearchBarWrapper>
      </form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px;
`;

const SearchBarWrapper = styled.div`
  display: flex;
  border: 1px solid #6466ff;
  border-radius: 40px;
  justify-content: space-around;
  align-items: center;
  padding: 2px 20px;
`;

const SearchBar = styled.input`
  width: 800px;
  height: 45px;
  border: 0px solid white;

  &:focus {
    outline: none;
  }
`;

const SearchIcon = styled(BsSearch)`
  width: 21px;
  height: 21px;
  color: #6466ff;
`;

export default AddressBar;
