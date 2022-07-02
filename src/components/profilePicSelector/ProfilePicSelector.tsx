import { SelectorContainer, ProfilePic, Title } from './styles';

import mockedFace1 from '../../assets/profilePic/mockedFace1.jpg';
import mockedFace2 from '../../assets/profilePic/mockedFace2.jpg';
import mockedFace3 from '../../assets/profilePic/mockedFace3.jpg';
import mockedFace4 from '../../assets/profilePic/mockedFace4.jpg';
import mockedFace5 from '../../assets/profilePic/mockedFace5.jpg';

const profilepics = [
  { id: 0, pic: mockedFace1 },
  { id: 1, pic: mockedFace2 },
  { id: 2, pic: mockedFace3 },
  { id: 3, pic: mockedFace4 },
  { id: 4, pic: mockedFace5 }
];

export type PicType = {
  id: number;
  pic: string;
}

export interface PicSelectorProps {
  onSelect: (pic: PicType) => void;
  selectedPic: PicType;
}

export default ({ onSelect, selectedPic }: PicSelectorProps) => {
  const selectPicHandler = (id: number, data: string) => {
    const selectPic = { id, pic: data };
    onSelect(selectPic);
  };

  return (
    <div>
      <Title>Select profile picture</Title>
      <SelectorContainer>
        {profilepics.map((p: PicType) => (
          <ProfilePic
            key={p.id}
            src={p.pic}
            onClick={() => selectPicHandler(p.id, p.pic)}
            isSelected={selectedPic.id === p.id}
            alt="generic profile pic"
          />
        ))}
      </SelectorContainer>
    </div>
  );
};
