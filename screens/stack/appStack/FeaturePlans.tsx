import { FlatList, StyleSheet } from 'react-native';
import React, { useCallback } from 'react';
import Container from '../../../components/Container';
import Header from '../../../customs/Headers/Header';
import { useAppDispatch, useAppSelector } from '../../../redux/Store';
import { useFocusEffect } from '@react-navigation/native';
import { featurePlans } from '../../../redux/thunk/planThunk';
import { moderateScale, screenWidth } from '../../../components/Matrix/Responsive';
import FeatureCardSkeleton from '../../../customs/Skeleton/FeatureCardSkeleton';
import FeatureCard from '../../../customs/Cards/FeatureCard';

const FeaturePlans = () => {
    const dispatch = useAppDispatch();
    const { featured, loading } = useAppSelector((state) => state.plan);

    // Fetch on screen focus
    useFocusEffect(
        useCallback(() => {
            (async () => {
                await dispatch(featurePlans());
            })();
        }, [dispatch])
    );

    return (
        <Container>
            <Header title="Feature Plans" />

            {/* Loading Skeleton */}
            {loading ? (
                <FlatList
                    data={[1, 2, 3]}
                    contentContainerStyle={{
                        gap: moderateScale(10),
                        marginTop: moderateScale(10),
                        alignSelf:"center"
                    }}
                    showsVerticalScrollIndicator={false}
                    renderItem={() => <FeatureCardSkeleton width={screenWidth * 0.9} />}
                    keyExtractor={(i) => i.toString()}
                />
            ) : (
                <FlatList
                    data={featured.slice(0, 5)}
                    contentContainerStyle={{
                        gap: moderateScale(10),
                        marginTop: moderateScale(10),
                        alignSelf: "center"
                    }}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item?.id?.toString()}
                    renderItem={({ item }) => (
                        <FeatureCard
                            width={screenWidth * 0.9}
                            item={item}
                        />
                    )}
                />
            )}
        </Container>
    );
};

export default FeaturePlans;

const styles = StyleSheet.create({});
