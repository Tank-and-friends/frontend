import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TextInput,
  TouchableOpacity,
  Linking,
} from 'react-native';
import axiosInstance from '../../apis/apiConfig';
import {useNavigation} from '@react-navigation/core';
import Icon from 'react-native-vector-icons/Ionicons';

interface StudentAccount {
  account_id: string;
  last_name: string;
  first_name: string;
  email: string;
  student_id: string;
}

interface SurveyResponse {
  id: number;
  assignment_id: number;
  submission_time: string;
  grade: number | null;
  file_url: string;
  text_response: string;
  student_account: StudentAccount;
}

const GradeScreen = () => {
  const navigation = useNavigation();
  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [grading, setGrading] = useState<{[key: number]: string}>({}); // Điểm của từng bài
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const fetchSurveyResponses = async () => {
    setLoading(true);
    try {
      const requestData = {
        token: 'rKXjuw',
        survey_id: '437',
      };

      const response = await axiosInstance.post(
        '/it5023e/get_survey_response',
        requestData,
      );

      if (response.meta.code === '1000') {
        setResponses(response.data);
      } else {
        Alert.alert('Lỗi', response.meta.message);
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể tải dữ liệu.');
    } finally {
      setLoading(false);
    }
  };

  const submitGrade = async (submissionId: number, score: string) => {
    if (!score) {
      Alert.alert('Cảnh báo', 'Vui lòng nhập điểm trước khi chấm.');
      return;
    }
    setIsSubmitting(true);
    try {
      const requestData = {
        token: 'rKXjuw',
        survey_id: '437',
        grade: {
          score,
          submission_id: submissionId.toString(),
        },
      };

      const response = await axiosInstance.post(
        '/it5023e/submit_grade', // Endpoint chấm điểm
        requestData,
      );

      if (response.meta.code === '1000') {
        Alert.alert('Thành công', 'Đã chấm điểm thành công!');
        fetchSurveyResponses(); // Làm mới danh sách bài nộp
      } else {
        Alert.alert('Lỗi', response.meta.message);
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể chấm điểm.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchSurveyResponses();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButtonContainer}>
          <Icon name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>
      ),
      headerShown: true,
    });
  }, [navigation]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  const renderItem = ({item}: {item: SurveyResponse}) => (
    <View style={styles.card}>
      <Text style={styles.title}>
        {item.student_account.last_name} {item.student_account.first_name} -{' '}
        {item.student_account.student_id}
      </Text>
      <Text>
        Thời gian nộp: {new Date(item.submission_time).toLocaleString()}
      </Text>
      <Text>Phản hồi: {item.text_response || 'Không có'}</Text>
      <Text>Điểm: {item.grade !== null ? item.grade : 'Chưa chấm'}</Text>
      <TouchableOpacity
        onPress={() => Linking.openURL(item.file_url)}
        style={styles.linkButton}>
        <Text style={styles.linkText}>Xem bài làm</Text>
      </TouchableOpacity>
      {/* Chỉ cho nhập điểm nếu chưa có điểm */}
      {item.grade === null && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Nhập điểm"
            keyboardType="numeric"
            value={grading[item.id] || ''}
            onChangeText={text => setGrading({...grading, [item.id]: text})}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => submitGrade(item.id, grading[item.id])}
            disabled={isSubmitting}>
            <Text style={styles.buttonText}>
              {isSubmitting ? 'Đang chấm...' : 'Chấm điểm'}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Danh sách bài nộp</Text>
      <FlatList
        data={responses}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  container: {
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginTop: 8,
  },
  button: {
    backgroundColor: '#C02135',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  linkButton: {
    marginTop: 8,
  },
  linkText: {
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
  backButtonContainer: {
    paddingLeft: 16,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  backButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  contentContainer: {},
});

export default GradeScreen;
