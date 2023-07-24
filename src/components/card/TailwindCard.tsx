import React from 'react';
import { styled } from 'styled-components';

export interface TailwindCardProps {
  name: string;
  image?: string;
  subject: string;
  type: string;
  publisher: string;
  tags?: Array<string>;
  styles?: {
    container?: {};
    headingDiv?: {};
    heading?: {};
    type?: {};
    imageDiv?: {};
    image?: {};
    tagsDiv?: {};
    LowerDiv?: {};
    LowerItem?: {};
    LowerDT?: {};
    LowerDD?: {};
    tag?: {};
  };
}

const Container = styled.div`
  display: block;
  overflow: hidden;
  padding: 1rem;
  border-radius: 0.5rem;
  border-width: 1px;
  border-color: gray;
  border-bottom-width: 0.5rem;
  border-bottom-color: #a7f3d0;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  width: 98%;

  @media (min-width: 640px) {
    padding: 1.5rem;
  }
  @media (min-width: 768px) {
    width: 24rem;
  }
  @media (min-width: 1024px) {
    margin-top: 0;
    margin-bottom: 0;
    width: 21rem;
  }
`;

const TopContent = styled.div`
  display: flex;
  justify-content: space-between;
  @media (min-width: 640px) {
    justify-content: space-between;
    gap: 1rem;
  }
`;

const Link = styled.a`
  font-weight: 700;
  color: #111827;
  @media (min-width: 1024px) {
    font-size: 1.25rem;
  }
`;

const Type = styled.p`
  margin-top: 0.25rem;
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 700;
  color: #4b5563;
`;

const ImageDiv = styled.div`
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

const Image = styled.img`
  object-fit: cover;
  border-radius: 9999px;
  width: 4rem;
  height: 4rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`;

const TagsDiv = styled.div`
  display: flex;
  column-gap: 0.75rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: #6b7280;
  max-width: 40ch;
`;

const Tags = styled.div`
  display: inline-flex;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  align-items: center;
  border-radius: 9999px;
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 700;
  color: #047857;
  text-transform: uppercase;
  background-color: #a7f3d0;
`;

const LowerDiv = styled.dl`
  display: flex;
  margin-top: 1rem;
  gap: 1rem;
  width: 70%;
  justify-content: space-between;

  @media (min-width: 640px) {
    gap: 1.5rem;
  }
`;

const LowerItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const DescType = styled.dt`
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  color: #4b5563;
`;

const DetailDesc = styled.dd`
  font-size: 0.75rem;
  line-height: 1rem;
  color: #6b7280;
`;

export const TailwindCard = ({
  name,
  image,
  type,
  subject,
  publisher,
  tags,
  styles,
}: TailwindCardProps) => {
  return (
    <Container style={styles?.container}>
      <TopContent style={styles?.headingDiv}>
        <div>
          <Link style={styles?.heading}>{name}</Link>
          <Type style={styles?.type}>{type}</Type>
        </div>
        <ImageDiv style={styles?.imageDiv}>
          <Image
            style={styles?.image}
            src={
              image
                ? image
                : 'https://static.vecteezy.com/system/resources/previews/004/141/669/original/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg'
            }
          />
        </ImageDiv>
      </TopContent>
      <div style={{ marginTop: '10px' }}>
        <TagsDiv style={styles?.tagsDiv}>
          {tags?.map((tag, idx) => (
            <Tags style={styles?.tag} key={idx + 1}>
              {tag}
            </Tags>
          ))}
        </TagsDiv>
        <LowerDiv style={styles?.LowerDiv}>
          <LowerItem style={styles?.LowerItem}>
            <DescType style={styles?.LowerDT}>Subject</DescType>
            <DetailDesc style={styles?.LowerDD}>{subject}</DetailDesc>
          </LowerItem>
          <LowerItem style={styles?.LowerItem}>
            <DescType style={styles?.LowerDT}>Publisher</DescType>
            <DetailDesc style={styles?.LowerDD}>{publisher}</DetailDesc>
          </LowerItem>
        </LowerDiv>
      </div>
    </Container>
  );
};
