type DrawerModalProps = {
  open: boolean;
  setOpen: Function;
};
type InitialType = {
  id?: number;
  title?: string;
};

const initialTemplate = [
  {
    id: 1,
    title: 'FinAid'
  },
  {
    id: 2,
    title: 'Finance'
  },
  {
    id: 3,
    title: 'Admission'
  },
  {
    id: 4,
    title: 'Information'
  },
  {
    id: 5,
    title: 'Admin'
  },
  {
    id: 6,
    title: 'FinAid-1'
  },
  {
    id: 7,
    title: 'FinAid'
  },
  {
    id: 8,
    title: 'Finance'
  },
  {
    id: 9,
    title: 'Admission'
  },
  {
    id: 10,
    title: 'Information'
  },
  {
    id: 11,
    title: 'FinAid'
  },
  {
    id: 12,
    title: 'Finance'
  },
  {
    id: 13,
    title: 'Admission'
  },
  {
    id: 14,
    title: 'Information'
  }
];

export { DrawerModalProps, InitialType, initialTemplate };
