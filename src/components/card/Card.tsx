import React from 'react';
import { CardProps } from '../../interfaces/interface';
import { Container, DescType, DetailDesc, Image, ImageDiv, Link, LowerDiv, LowerItem, Tags, TagsDiv, TopContent, Type } from "../styled-components/CardElements"

export const Card = ({
  name,
  image,
  type,
  subject,
  publisher,
  tags,
  styles,
}: CardProps) => {
  return (
    <div hidden={name === ''}>
      <Container style={styles?.container}>
        <TopContent style={styles?.headingDiv}>
          <div>
            <Link style={styles?.heading}>{name}</Link>
            {type && <Type style={styles?.type}>{type}</Type>}
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
          <div hidden={tags?.length === 0}>
            <TagsDiv style={styles?.tagsDiv}>
              {tags?.map((tag, idx) => (
                <Tags style={styles?.tag} key={idx + 1}>
                  {tag}
                </Tags>
              ))}
            </TagsDiv>
          </div>
          <LowerDiv style={styles?.LowerDiv}>
            {subject &&
              <LowerItem style={styles?.LowerItem}>
                <DescType style={styles?.LowerDT}>Subject</DescType>
                <DetailDesc style={styles?.LowerDD}>{subject}</DetailDesc>
              </LowerItem>
            }
            {publisher &&
              <LowerItem style={styles?.LowerItem}>
                <DescType style={styles?.LowerDT}>Publisher</DescType>
                <DetailDesc style={styles?.LowerDD}>{publisher}</DetailDesc>
              </LowerItem>
            }
          </LowerDiv>
        </div>
      </Container>
    </div>
  );
};