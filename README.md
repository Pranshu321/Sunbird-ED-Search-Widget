# Sunbird React Filtering

A React filtering widget is a user interface component built using the React library that facilitates the process of filtering and refining data or content displayed on a web page. This widget is particularly useful when dealing with sunbird data or lists of items and allows users to interactively narrow down the displayed information based on their preferences or criteria.

## Installation

- **Prerequisites:** Ensure that you have Node.js and npm (Node Package Manager) installed on your system. You can download them from the official website: Node.js Downloads.

- **Create a React App:** If you haven't already, create a React application using Create React App. This tool sets up a basic React project structure for you.

- **Navigate to Your Project Directory:** Open your terminal or command prompt and navigate to the root directory of your React project.
  Install the Filtering Widget Package: Use npm or yarn to install the filtering widget package. For example:

```cmd
npm install filtering-package
# or
yarn add filtering-package
```

- Import the Widget: In your React component where you want to use the filtering widget, import it at the top of your file:

```cmd

import {ApiContext} from "filtering-package"

```

## Project Setup

The project is set up in a modular fashion, with each folder containing code for a specific component or functionality. The `components` folder contains the code for the React components, which are used to render the UI. The `Filter` folder contains the code for the filter component, which allows users to filter the data. The `styled-components` folder contains the code for the styled components, which are used to style the UI. The `interfaces` folder contains the interface definitions, which are used to define the data structures used by the project.

```
api
    api.ts
    Service Function.ts

components
    card
        Card.tsx
    FetchingComponent
        ApiContext.tsx
        CardContext.tsx
        Wrapper.tsx
    Filter
        index.tsx
        Select.tsx
        SingleSelect.tsx

styled-components
    CardElements.ts
    ContextElements.ts
    SelectElements.ts

interfaces
    interface.ts
    Service Function_Interfaces.ts
    index.tsx

typings.d.ts
```

The following are some of the key files in the project setup:

### Algorithms

The `api` folder contains the code for fetching data from a remote server and filtering functions and other important functions for optimal working.

- **api.ts :** This file defines the API endpoints. It contains the functions that are used to fetch data from the remote server.
- **service_functions.ts :** The Service Function.ts file contains the service functions that are used to process the API response and additional refactoring.

### Components

- **Card :** This Folder contains the file `Card.tsx` This file defines the Card component. It is a React component that is used to render a card.
- **FetchingComponent :** It is a React component that is used and with required props for the functioning.

  - **ApiContext.tsx:** This file defines the ApiContext provider. It is a React context provider that is used to inject the API instance into the child components.
  - **CardContext.tsx:** This file defines the CardContext provider. It is used to inject the Card props into the child components.
  - **Wrapper.tsx:** This file wraps the ApiContext provider. It is used to ensure that all Card components have access to the API instance.

- **Filter :** This folder contains two files one `Select.tsx` file defines a generic select component that can be used to filter the data by any property. The `SingleSelect.tsx` file defines a specific select component that can be used to filter the data by a single property.

### Styled Components

The styled-components folder contains the code for the styled components. The `CardElements.tsx`, `ContextElements.tsx`, and `SelectElements.tsx` files define the styled components that are used to style the filter component.

### Interfaces

The interfaces folder contains the interface definitions. The `interface.ts` file defines the interface for the filter component. The `Service Function_Interfaces.ts` file defines the interface for the service functions.

## Features

- **Filtering Criteria:** Users can specify criteria or parameters by which they want to filter the data. This might include text-based searches, date ranges, categories, or any other relevant attributes.

- **Filter Inputs:** Input fields, dropdown menus, sliders, or checkboxes are provided for users to input their filtering criteria. For instance, on an e-commerce website, users might filter products by price range, brand, or product category.

- **Card Fields Management:** Card Fields Management refers to the process of configuring and controlling the fields or attributes displayed on a digital card or card-based interface within a sunbird application.

- **Multiple Filters (Additional Filters):** The widget should support multiple filters simultaneously, allowing users to refine their search with a combination of criteria.

- **Customization:** The widget should be customizable to fit the visual style and functionality of the specific application or website.

## Configuration

### Form

Description: The Form configuration which configure the
Field: Formurl

```js
[
  {
    id: 'api.form.read',
    name: 'Categories',
    responseCode: 'OK',
    data: {
      defaultLanguage: 'en',
      PrimaryFields: {
        Board: {
          field: '',
          isEnabled: true,
        },
        Medium: {
          field: '',
          isEnabled: true,
        },
        Class: {
          field: '',
          isEnabled: true,
        },
        Subject: {
          field: '',
          isEnabled: true,
        },
      },
      additionalFields: {},
    },
    created_on: '2022-08-18T15:00:46.375Z',
    last_modified_on: '2022-08-23T08:08:46.600Z',
    rootOrgId: '*',
    ts: '2023-08-09T07:13:17.674Z',
    ver: '1.0',
  },
];
```

### Default Channel Configuration:

**Description**: This section configures default settings related to channel communication. Channels are typically used for data retrieval or messaging.

**Fields Accepted:**

- Method: The HTTP request method (e.g., GET, POST) is used for default channel communication.
- Headers (Optional): HTTP headers are included in the default channel request.
- Cache: The caching strategy applied to default channel requests (e.g., "default").

### Search API Configuration:

**Description**: This configuration section is related to the Search API, which is commonly used for querying and retrieving data.

**Fields Accepted:**

- Method: The HTTP request method (e.g., GET, POST) for Search API requests.
- Headers (Optional): HTTP headers included in Search API requests.
- Body (Optional): The content of the request body for Search API requests.

### Channel Configuration:

**Description**: Similar to the Default Channel Configuration, this section pertains to the configuration of a specific channel used for data retrieval.

**Fields Accepted:**

- Method: The HTTP request method for Get Channel requests.
- Headers: HTTP headers are included in Get Channel requests.
- Cache: The caching strategy applied to Get Channel requests.
- Field: GetChannel

### Terms Read Configuration:

**Description**: This section configures how terms are read or retrieved, potentially for use in the application.

**Fields Accepted:**

- Method: The HTTP request method for reading terms.
- Headers: HTTP headers included in terms of reading requests.
- Body: The content of the request body for terms reading requests (typically empty).
- Field: TermsRead

### Hostname:

- **Description**: The Hostname specifies the base URL (https://dev.sunbirdsaas.com) where API requests are directed.
- Field: hostname

### Card Fields Properties:

Description: This section defines properties related to the display of cards or items. Cards are often used to represent data visually. We have to put Fields in `CardFieldsProps` which we have to show in card.

**Fields Accepted:**

- Name: The field name for card display.
- Type: The type of field for card display.
- Tags: An array of tags associated with the card.
- Image: The field used for displaying card images.
- Publisher: The field used for displaying the card's publisher information.
- Subject: The field used for displaying the card's subject.
- Field: CardFieldsProps

```ts
CardFieldsProps={{
          name: {
            field: 'name',
          },
          type: {
            field: "se_subjects"
          },
          tags: {
            TagsFieldArray: [
              "medium",
              "se_boards",
              "se_subjects",
            ]
          },
          image: {
            field: "appIcon"
          },
          publisher: { field: "organisation" },
          subject: { field: "se_subjects" }
        }}
```

### Default Cache Setting:

**Description:** This setting determines the caching behavior of the component, potentially influencing how data is retrieved and displayed.
Field: cache

### Filter Configuration:

**Description**: This section defines various filters that can be applied to the data. Filters allow users to narrow down or customize data views.

**Fields Accepted:**

- Name: The display name of the filter.
- Field: The corresponding API field associated with the filter.

```
Here, are the master categories
Supported Filters (examples):
Board
Medium
Subject
Grade Level
```

- Field: filterConfig

### Additional Filter Configuration:

- Description: Additional filter configuration options that can be applied to enhance data filtering capabilities.

**Fields Accepted:**

- Name: The display name of the filter.
- Field: The corresponding API field associated with the filter.
- Is Enabled: Indicates whether the filter is enabled (true or false).

### StyleProps

The `StyleProps` interface defines the style props that can be used to customize the look and feel of the filter component.

The interface has three properties:

- **apiContextStyle :** This property is used to style the container that holds the API context provider.
  - `Container`: This prop is used to style the container element.
  - `Sidebar`: This prop is used to style the sidebar element.
  - `FiltersDiv`: This prop is used to style the filters div element.
  - `Filter`: This prop is used to style the filter element.
  - `Button`: This prop is used to style the button element.
  - `ListDiv`: This prop is used to style the list div element.
- **SelectStyle :** This property is used to style the select component.
  - `container`: This prop is used to style the container element.
  - `OptionNameStyle`: This prop is used to style the option name element.
  - `OptionStyle`: This prop is used to style the option element.
  - `OptionDivStyle`: This prop is used to style the option div element.
  - `select`: This prop is used to style the select element.
  - `OptionsItem`: This prop is used to style the options item element.
- **CardStyle :** This property is used to style the card component.
  - `container`: This prop is used to style the container element.
  - `headingDiv`: This prop is used to style the heading div element.
  - `heading`: This prop is used to style the heading element.
  - `type`: This prop is used to style the type element.
  - `imageDiv`: This prop is used to style the image div element.
  - `image`: This prop is used to style the image element.
  - `tagsDiv`: This prop is used to style the tags div element.
  - `LowerDiv`: This prop is used to style the lower div element.
  - `LowerItem`: This prop is used to style the lower item element.
  - `LowerDT`: This prop is used to style the lower DT element.
  - `LowerDD`: This prop is used to style the lower DD element.
  - `tag`: This prop is used to style the tag element.

This detailed documentation explains the purpose and potential usage of each configuration option within the Wrapper component. It also outlines the types of fields accepted by each configuration element, helping users understand how to customize and adapt the component to their specific needs.

## ScreenShots and Demo

![image](https://github.com/komalm/searchwidget/assets/86917304/2157c56e-2b6f-4dea-b7ea-78a21048ce50)

![ezgif-1-c2738da5fb](https://github.com/komalm/searchwidget/assets/86917304/00a5e1d1-6aca-48f9-8d27-f3e651c475fd)

## Contributing Guidelines

We welcome contributions from the community to improve this project. By participating, you agree to follow these guidelines to maintain a positive and collaborative environment.

### Getting Started

1. Fork the repository on GitHub.
2. Clone your forked repository to your local machine.
3. Create a new branch for your work: `git checkout -b feature/your-feature-name`.

### Making Changes

1. Ensure that your code adheres to the project's coding standards.
2. Make meaningful and focused commits. Use descriptive commit messages.
3. Keep pull requests (PRs) small and focused on a single feature or bug fix.
4. Update documentation as necessary.
5. Test your changes thoroughly.

### Submitting a Pull Request (PR)

1. Push your changes to your forked repository.
2. Create a PR from your fork to the main project repository.
3. Provide a clear title and description for your PR.
4. Mention any related issues using keywords like "Fixes #123" in the description.
5. Your PR will be reviewed by project maintainers. Be prepared to make changes if requested.

### Code of Conduct

Please follow our [Code of Conduct](CODE_OF_CONDUCT.md) to ensure a welcoming and inclusive community.

### Reporting Issues

If you encounter bugs or have feature requests, please [open an issue](https://github.com/your-project/repository/issues) on GitHub.

### Reviewing

Contributions will be reviewed by maintainers. Constructive feedback may be provided, and changes may be requested. Be patient and open to feedback.

### Licensing

By contributing to this project, you agree that your contributions will be licensed under the project's [LICENSE](LICENSE).

**Thank you for your contributions! 🎉**

## Links to Other Resources

Here are some additional resources that may be helpful as you contribute to this project:

- [Sunbird Forms](https://documenter.getpostman.com/view/25186239/2s93Y2TNAw)
- [Installing Sunbird on Windows](https://github.com/orgs/Sunbird-Ed/discussions/463)
- [TSDX Package Development Tool](https://tsdx.io/)
- [About Diksha](https://ed.sunbird.org/learn/adopters/diksha)
- [Sunbird ED Collection](https://documenter.getpostman.com/view/25186239/2s93eU2ZZ1#0ba7ecdf-cf32-4b3b-b9dc-e71825093cfd)
