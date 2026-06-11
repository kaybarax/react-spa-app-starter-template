/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

interface Link {
  site: string;
  link: string;
}

interface CreditPerson {
  person: string;
  attribution: string;
  links: Link[];
}

export const SOs_and_Credits_List: CreditPerson[] = [
  {
    person: 'Daishi Kato',
    attribution: 'Maintainer of Zustand, the global state manager powering the app, from the Poimandres collective.',
    links: [
      {
        site: 'Twitter',
        link: 'https://twitter.com/dai_shi',
      },
      {
        site: 'Zustand',
        link: 'https://github.com/pmndrs/zustand',
      },
    ],
  },
  {
    person: 'Tanner Linsley',
    attribution:
      'Creator of TanStack Query. The blessed option for server data fetching whenever a server comes into play.',
    links: [
      {
        site: 'Twitter',
        link: 'https://twitter.com/tannerlinsley',
      },
      {
        site: 'TanStack Query',
        link: 'https://tanstack.com/query/latest',
      },
    ],
  },
  {
    person: 'Kaybarax',
    attribution: 'Creator of this startup template.',
    links: [
      {
        site: 'Twitter',
        link: 'https://twitter.com/Kaybarax',
      },
      {
        site: 'Linked In',
        link: 'https://linkedin.com/in/kaybrax',
      },
    ],
  },
  {
    person: 'Andy Haskell',
    attribution:
      'Tutorial guide on implementing IndexedDb. Thanks a lot dude for your tutorial I ' +
      'came across on @Medium and Dev.to.',
    links: [
      {
        site: 'Twitter',
        link: 'https://twitter.com/AndyHaskell2013',
      },
      {
        site: 'Awesome intro to IndexedDb',
        link: 'https://dev.to/andyhaskell/build-a-basic-web-app-with-indexeddb-38ef',
      },
    ],
  },
];
