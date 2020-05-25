package com.calculator.customer.service.impl;

import com.calculator.customer.dao.domain.Record;
import com.calculator.customer.dao.domain.RecordExample;
import com.calculator.customer.dao.mapper.RecordMapper;
import com.calculator.customer.entity.RecordVO;
import com.calculator.customer.service.RecordService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

/**
 * @author : zhoutiejun@youngyedu.com, 2020/5/25 0025 上午 11:03
 * @description :
 * @modified : zhoutiejun@youngyedu.com, 2020/5/25 0025 上午 11:03
 */
@Service("recordService")
public class RecordServiceImpl implements RecordService {

    @Autowired
    private RecordMapper recordMapper;

    @Override
    public void uploadRecord(RecordVO recordVO) {
        Record record = new Record();
        BeanUtils.copyProperties(recordVO, record);
        recordMapper.insertSelective(record);
    }

    @Override
    public List<RecordVO> listRecord() {
        List<Record> recordList =  recordMapper.selectByExample(null);

        return transferDO2VO(recordList);
    }

    private List<RecordVO> transferDO2VO(List<Record> recordList) {
        List<RecordVO> recordVOList = new ArrayList<>();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        for(Record record : recordList){
            RecordVO recordVO = new RecordVO();
            BeanUtils.copyProperties(record, recordVO);
            recordVO.setCreateTime(simpleDateFormat.format(record.getCreateTime()));

            recordVOList.add(recordVO);
        }
        return recordVOList;
    }
}
