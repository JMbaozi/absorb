package ClassLearn;
/**
 * 角色类的学习
 * @author JMbaozi
 *
 */
public class Role {
//	名称
//	等级
//	职业
//	技能
	public String name;
	public int level;
	public String job;
	//默认构造
	public Role() {}
	public Role(String name_,int level_,String job_) {
		name = name_;
		level = level_;
		job = job_;
	}
	public void castSpell() {
		if(name.equals("劳拉")) {
			System.out.println("劳拉的经典技能：双枪老太婆");
		}else if(name.equals("孙悟空")) {
			System.out.println("吃俺老孙一棒");
		}else {
			System.out.println(name + "放出了必杀技！");
		}
	}
}
