import { Image, ImageSourcePropType } from "react-native";

type ImageViewProps = {
    selectedImage: string | null
}
export default function ImageViewer({ selectedImage }: ImageViewProps) {
    const imageSource = selectedImage && { uri: selectedImage }

    return <Image source={imageSource as ImageSourcePropType} />;
}
