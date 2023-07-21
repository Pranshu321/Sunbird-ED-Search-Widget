import React from 'react';

export interface TailwindCardProps {
  name: string;
  image?: string;
  subject: string;
  type: string;
  publisher: string;
  tags?: [];
  styles?: {
    container?: {};
    headingDiv?: {};
    heading?: {};
    type?: {};
    imageDiv?: {};
    image?: {};
    tagsDiv?: {};
    Bottom?: {};
    tag?: {};
  };
}

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
    <div
      style={styles?.container}
      className="relative block overflow-hidden rounded-lg border w-[98%] md:w-96 lg:my-0 lg:w-96 border-gray-100 p-4 sm:p-6 lg:p-8"
    >
      <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

      <div
        style={styles?.headingDiv}
        className="sm:flex sm:justify-between sm:gap-4"
      >
        <div>
          <a
            href="#"
            style={styles?.heading}
            className="text-md font-bold text-gray-900 lg:text-lg"
          >
            {name}
          </a>

          <p
            style={styles?.type}
            className="mt-1 text-xs font-bold text-gray-600"
          >
            {type}
          </p>
        </div>

        <div
          style={styles?.imageDiv}
          className="block sm:shrink-0 my-2 lg:my-0"
        >
          <img
            alt="Paul Clapton"
            style={styles?.image}
            src={
              image
                ? image
                : 'https://obj.diksha.gov.in/ntp-content-production/content/do_31307361004425216012890/artifact/leac1cc.thumb.jpg'
            }
            className="h-16 w-16 rounded-full object-cover shadow-sm"
          />
        </div>
      </div>

      <div className="mt-4">
        <div
          className="max-w-[40ch] flex gap-x-3 text-sm text-gray-500"
          style={styles?.tagsDiv}
        >
          {tags?.map((item,idx) => (
            <div
              key={idx+1}
              style={styles?.tag}
              className="text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-green-200 text-green-700 rounded-full"
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      <dl className="mt-6 flex gap-4 sm:gap-6" style={styles?.Bottom}>
        <div className="flex flex-col-reverse">
          <dt className="text-sm font-medium text-gray-600">{subject}</dt>
          <dd className="text-xs text-gray-500">Subject</dd>
        </div>

        <div className="flex flex-col-reverse">
          <dt className="text-sm font-medium text-gray-600">{publisher}</dt>
          <dd className="text-xs text-gray-500">Publisher</dd>
        </div>
      </dl>
    </div>
  );
};
