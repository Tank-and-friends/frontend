import axiosInstance from '../../apis/apiConfig';
import {Survey} from './type';

export const getAllSurveys = async (
  token = 'Mq9YoW',
  classId = '000254',
): Promise<Survey[]> => {
  try {
    const response = await axiosInstance.post('/it5023e/get_all_surveys', {
      token,
      class_id: classId,
    });
    // console.log('haha', response);

    const data = response.data;

    const surveyData = data?.map((item: Survey) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      lecturer_id: item.lecturer_id,
      deadline: item.deadline,
      file_url: item.file_url,
      class_id: item.class_id,
    }));

    return surveyData;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getStudentAssignments = async (
  classId = '000254',
  type: string | null = null,
  token = 'Mq9YoW',
): Promise<Survey[]> => {
  try {
    const response = await axiosInstance.post(
      '/it5023e/get_student_assignments',
      {
        token,
        type,
        class_id: classId,
      },
    );
    console.log(response);

    const data = response.data;

    const surveyData = data?.map((item: Survey) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      lecturer_id: item.lecturer_id,
      deadline: item.deadline,
      file_url: item.file_url,
      class_id: item.class_id,
    }));

    return surveyData;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const deleteAssignment = async (
  token = 'Mq9YoW',
  survey_id: string,
): Promise<boolean> => {
  try {
    const response = await axiosInstance.post('/it5023e/delete_survey', {
      token,
      survey_id,
    });
    console.log('abcd: ', response);
    if (response.meta.code == '1000') {
      console.log('ok');
      return true;
    }
    return false;
  } catch (error) {
    console.log('deleteError', error);
    return false;
  }
};

export const submitSurvey = async (
  file: any,
  surveyId: string,
  token = 'Mq9YoW',
  textResponse = 'Tạm thời chưa có',
): Promise<any> => {
  if (!file || file.length === 0) {
    console.error('No file selected');
    return;
  }

  const formData = new FormData();
  formData.append('file', {
    uri: file[0].uri,
    type: file[0].type,
    name: file[0].name,
  });
  formData.append('token', token);
  formData.append('assignmentId', surveyId);
  formData.append('textResponse', textResponse);

  try {
    const response = await axiosInstance.post(
      '/it5023e/submit_survey',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data; // Trả về dữ liệu phản hồi từ server
  } catch (error) {
    console.error('Error submitting survey:', error);
    throw error; // Ném lỗi ra ngoài để xử lý ở nơi gọi
  }
};
