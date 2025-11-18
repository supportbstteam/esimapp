import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomModal from '../../customs/CustomModal'
import CustomText from '../../customs/CustomText'
import CustomButton from '../../customs/CustomButton'
import { globalStyle } from '../../utils/GlobalStyle'
import Colors from '../../utils/Color'
import { moderateScale, screenHeight } from '../Matrix/Responsive'

const DeleteModal = ({
    title = "",
    loading=false,
    open,
    onClose,
    onDelete
}: any) => {
    return (
        <CustomModal visible={open} onDismiss={onClose} iscenter={true} >
            <View style={{ height: screenHeight * .2 }} >
                <View style={[globalStyle.center, { paddingTop: moderateScale(10), marginTop: moderateScale(10) }]} >
                    <CustomText color={Colors.secondary} customStyle={{ textAlign: "center" }} weight="600" size={20} text={`Delete ${title}`} />
                    <CustomText weight="500" size={16} customStyle={{ textAlign: "center" }} text={`Are you sure? You want to delete this ${title}`} />
                </View>
                <View style={[globalStyle.center, { alignSelf: "center", flexDirection: "row", marginTop: moderateScale(15), gap: moderateScale(20) }]} >
                    
                    <CustomButton
                        loading={loading}
                        disabled={loading}
                        title='Yes'
                        bg={Colors.cross}
                        textColor='#fff'
                        onPress={onDelete}
                        customStyle={{
                            width: "40%"
                        }}
                    />

                    <CustomButton
                        title='No'
                        onPress={onClose}
                        customStyle={{
                            width: "40%"
                        }}
                    />
                </View>
            </View>
        </CustomModal>
    )
}

export default DeleteModal

const styles = StyleSheet.create({})