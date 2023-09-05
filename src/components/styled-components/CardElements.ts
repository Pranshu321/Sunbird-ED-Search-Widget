import { styled } from 'styled-components';

export const Container = styled.div`
  display: block;
  overflow: hidden;
  padding: 1rem;
  border-radius: 0.5rem;
  border-width: 1px;
  border-color: gray;
  border-bottom-width: 0.5rem;
  border-bottom-color: #a7f3d0;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.1);
  &:hover {
    box-shadow: 8px 8px 8px 8px rgba(0, 0, 0, 0.2);
    scale: 1.001;
    animation: both 0.3s ease-in-out;
    cursor: pointer;
  }
  width: 98%;
  width: 23rem;
  /* height: fit-content; */
  @media (min-width: 1024px) {
    margin-top: 0;
    margin-bottom: 0;
    width: 21rem;
    max-height: fit-content;
    min-height: 11.5rem;
  }
  @media screen and (max-width: 500px) {
    width: 23rem;
  }
`;

export const TopContent = styled.div`
  display: flex;
  justify-content: space-between;
  @media (min-width: 640px) {
    justify-content: space-between;
    gap: 1rem;
  }
`;

export const Link = styled.a`
  font-weight: 700;
  color: #111827;
  @media (min-width: 1024px) {
    font-size: 1.25rem;
  }
`;

export const Type = styled.p`
  margin-top: 0.25rem;
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 700;
  color: #4b5563;
`;

export const ImageDiv = styled.div`
  display: block;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;

  @media (min-width: 640px) {
    shrink: 0;
  }

  @media (min-width: 1024px) {
    margin-top: 0;
    margin-bottom: 0;
  }
`;

export const Image = styled.img`
  object-fit: cover;
  border-radius: 9999px;
  width: 4rem;
  height: 4rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`;

export const TagsDiv = styled.div`
  display: flex;
  column-gap: 0.75rem;
  font-size: 0.4rem;
  line-height: 1.25rem;
  color: #6b7280;
  min-width: 40ch;
  max-width: fit-content;
`;

export const Tags = styled.div`
  display: inline-flex;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 6px;
  padding-right: 6px;
  align-items: center;
  border-radius: 9999px;
  font-size: 0.6rem;
  line-height: 1rem;
  font-weight: 700;
  color: #047857;
  text-transform: uppercase;
  background-color: #a7f3d0;
`;

export const LowerDiv = styled.dl`
  display: flex;
  margin-top: 1rem;
  gap: 1rem;
  width: 100%;
  justify-content: space-between;

  @media (min-width: 640px) {
    gap: 1.5rem;
  }
`;

export const LowerItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const DescType = styled.dt`
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  color: #4b5563;
`;

export const DetailDesc = styled.dd`
  font-size: 0.75rem;
  line-height: 1rem;
  text-align: center;
  margin-left: 0;
  color: #6b7280;
`;
