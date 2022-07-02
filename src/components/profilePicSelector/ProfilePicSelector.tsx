import profilepics from '../../constants/profilePic';
import { SelectorContainer, ProfilePic, Title } from './styles';

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
