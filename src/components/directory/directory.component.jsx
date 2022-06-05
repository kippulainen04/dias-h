import DirectoryItem from "../directory-item/directory-item.component";
import styled from "styled-components"

const DirectoryContainer = styled('div')({
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
})

const Directory = ({categories}) => {
    return (
      <>
        <DirectoryContainer>
          {categories.map((category) => (
            <DirectoryItem key={category.id} category={category} />
          ))}
        </DirectoryContainer>
      </>
    )
}

export default Directory;