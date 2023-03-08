import { atom, useAtom } from "jotai";

interface Contact {
  id: string;
  label: string;
  did: string;
}

const _contactsAtom = atom<Record<string, Contact>>({});

export function useContacts() {
  const [contacts, setContacts] = useAtom(_contactsAtom);

  return {
    contacts,
    addContact: (contact: Contact) => {
      if (!contact.id) throw new Error("Contact must have an id");
      setContacts((old) => ({ ...old, [contact.id]: contact }));
    },
    removeContact: (id: string) => {
      if (!id) throw new Error("Id must be provided");

      setContacts((old) => {
        const { [id]: _, ...rest } = old;
        return rest;
      });
    },
  };
}
