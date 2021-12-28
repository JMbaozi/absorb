function weights = EntropyWeight(R)
%% ��Ȩ����ָ��Ȩ��,RΪ�������,����Ȩ������weights

[rows,cols]=size(R); % �������Ĵ�С,rowsΪ���������colsΪָ�����
k=1/log(rows);        % ��k

f=zeros(rows,cols);   % ��ʼ��fij
sumBycols=sum(R,1);   % ��������ÿһ��֮��(���Ϊһ��1*cols��������)
% ����fij
for i=1:rows
  for j=1:cols
      f(i,j)=R(i,j)./sumBycols(1,j);
  end
end

lnfij=zeros(rows,cols); % ��ʼ��lnfij
% ����lnfij
for i=1:rows
  for j=1:cols
      if f(i,j)==0
          lnfij(i,j)=0;
      else
          lnfij(i,j)=log(f(i,j));
      end
  end
end

Hj=-k*(sum(f.*lnfij,1)); % ������ֵHj
weights=(1-Hj)/(cols-sum(Hj));
end