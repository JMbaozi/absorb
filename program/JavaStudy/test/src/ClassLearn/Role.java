package ClassLearn;
/**
 * ��ɫ���ѧϰ
 * @author JMbaozi
 *
 */
public class Role {
//	����
//	�ȼ�
//	ְҵ
//	����
	public String name;
	public int level;
	public String job;
	//Ĭ�Ϲ���
	public Role() {}
	public Role(String name_,int level_,String job_) {
		name = name_;
		level = level_;
		job = job_;
	}
	public void castSpell() {
		if(name.equals("����")) {
			System.out.println("�����ľ��似�ܣ�˫ǹ��̫��");
		}else if(name.equals("�����")) {
			System.out.println("�԰�����һ��");
		}else {
			System.out.println(name + "�ų��˱�ɱ����");
		}
	}
}
