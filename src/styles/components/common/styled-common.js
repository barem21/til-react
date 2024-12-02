import styled from "@emotion/styled";

export const LinkDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33.3%;
  background-color: ${props => props.bg || "#fff"};
`;

export const ProductList = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  img {
    max-width: 100%;
    min-height: 120px;
    object-fit: cover;
  }
  p {
    color: #aaa;
    font-size: 13px;
  }

  .loop {
    max-width: 200px;
    box-sizing: border-box;
  }
  .img {
    font-size: 0px;
    border: 1px solid #eee;
  }
`;
