package enum_test;
/**
 * ���д���������ڳ����ж���һ��ö�����ͣ�������7��ö�ٳ������ֱ��ʾһ������ÿһ������ơ�Ȼ���ڿ���̨�����������Щ���ơ�
 * @author JMbaozi
 *
 */
public class enum_test {
	public enum WeekName{
		��һ,�ܶ�,����,����,����,����,����
	}
	public static void main(String[] args) {
		// TODO �Զ����ɵķ������
		WeekName[] N = WeekName.values();
		for(int i=0;i<N.length;i++){
			System.out.println(N[i]);
		}

	}

}
