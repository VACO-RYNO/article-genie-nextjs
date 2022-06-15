import { useState } from "react";
import styled from "styled-components";
import { BsSearch } from "react-icons/bs";

import useModal from "../../lib/hooks/useModal";

function AddressBar() {
  const [searchInput, setSearchInput] = useState("");
  const { showModal } = useModal();
  const handleChange = e => setSearchInput(e.target.value);
  const validURL = str => {
    var pattern = new RegExp(
      "^(http|https|ftp)://([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&amp;%$-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]).(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0).(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0).(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9-]+.)*[a-zA-Z0-9-]+.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(/($|[a-zA-Z0-9.,?'\\+&amp;%$#=~_-]+))*$",
    );

    return pattern.test(str);
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

      return;
    }

    return (window.location.href = `/genie-mode/?url=${searchInput}`);
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <AddressBarWrapper>
          <AddressBarInput
            type="url"
            pattern="https://.*"
            value={searchInput}
            onChange={handleChange}
            placeholder="Enter a URL of the website."
            required
          />
          <SearchIcon onClick={handleSubmit} />
        </AddressBarWrapper>
      </form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: auto;
  width: auto;
`;

const AddressBarWrapper = styled.div`
  display: flex;
  width: auto;
  height: 48px;
  border: 1px solid #6466ff;
  border-radius: 25px;
  justify-content: space-around;
  align-items: center;
  padding: 2px 20px;
`;

const AddressBarInput = styled.input`
  width: 45vw;
  height: 35px;
  border: none !important;

  &:focus {
    outline: none !important;
  }

  &::placeholder {
    font-size: 14px;
    font-weight: 400;
    color: #6466ff !important;
  }
`;

const SearchIcon = styled(BsSearch)`
  width: 21px;
  height: 21px;
  color: #6466ff;
`;

export default AddressBar;
