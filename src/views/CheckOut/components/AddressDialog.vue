<script setup>
import { ref } from 'vue'
import { addAddress, editAddress } from '@/apis/checkout'
import { ElMessage } from 'element-plus'
const props = defineProps({
    showFlag: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        default: ''
    },
    addressInfo: {
        type: Object,
        default: () => {}
    }
})
const emit = defineEmits(['close', 'update'])
// 通知父組件關閉談層並清空表單數據
const closeDialog = () => {
    emit('close', false)
}
// 通知父組件更新地址數據
const updateData = () => {
    emit('update')
}
const handleEdit = () => {
    if(props.title === 'edit') {
        formModel.value = props.addressInfo
    } else {
        formModel.value = {
            receiver: '',
            contact: '',
            provinceCode: '320000' ,
            cityCode: '320500',
            countyCode: '320508',
            address: '',
            postalCode: '' ,
            addressTags: '',
            isDefault: 0,
            fullLocation: '江苏省 苏州市 姑苏区'
        }
    }
}
// 表單相關
const formRef = ref(null)
const formModel = ref({
    receiver: '',
    contact: '',
    provinceCode: '320000' ,
    cityCode: '320500',
    countyCode: '320508',
    address: '',
    postalCode: '' ,
    addressTags: '',
    isDefault: 0,
    fullLocation: '江苏省 苏州市 姑苏区'
})
const formRules = ref({
    receiver: [
        { required: true, message: '請輸入收貨人姓名', trigger: 'blur' }
    ],
    contact: [
        { required: true, message: '請輸入收貨人手機號碼', trigger: 'blur' },
        { pattern: /^1[3-9]\d{9}$/, message: '請輸入正確的手機號碼格式', trigger: 'blur' }
    ],
    address: [
        { required: true, message: '請輸詳細地址', trigger: 'blur' }
    ],
    postalCode: [
        { required: true, message: '請輸入郵遞區號', trigger: 'blur' },
        { pattern: /^\d{6}$/, message: '郵遞區號為6碼', trigger: 'blur' }
    ],
    addressTags: [
        { required: true, message: '請輸入地址標籤', trigger: 'blur' }
    ]
})
const confirmForm = () => {
    formRef.value.validate(async(isOk) => {
        if(isOk) {
            if(formModel.value.id) {
                await editAddress(formModel.value.id, formModel.value)
                ElMessage.success('修改成功')
            }
            else {
                await addAddress(formModel.value)
                ElMessage.success('添加成功')
                updateData()
            }
            closeDialog()
        }
    })
}
</script>

<template>
<el-dialog :title="title === 'add' ? '添加地址' : '修改地址'" center :model-value="showFlag" @close="closeDialog" top="15px" @open="handleEdit">
  <el-form label-width="200px" size="large" class="form" :model="formModel" ref="formRef" :rules="formRules">
    <el-form-item label="收貨人姓名" prop="receiver">
        <el-input class="form-input" v-model="formModel.receiver" placeholder="請收貨人姓名"></el-input>
    </el-form-item>
    <el-form-item label="收貨人手機號碼" prop="contact">
        <el-input class="form-input" v-model="formModel.contact" placeholder="手機格式為1(3-9)xxxxxxxxx 共11位數, 例:15000000000"></el-input>
    </el-form-item>
    <el-form-item label="地區" prop="fullLocation">
        <el-input class="form-input" disabled v-model="formModel.fullLocation">江苏省 苏州市 姑苏区</el-input>
    </el-form-item>
    <el-form-item label="詳細地址" prop="address">
        <el-input class="form-input" v-model="formModel.address" placeholder="請輸入詳細地址"></el-input>
    </el-form-item>
    <el-form-item label="郵遞區號" prop="postalCode">
        <el-input class="form-input" v-model="formModel.postalCode" placeholder="請輸入郵遞區號(6位數)"></el-input>
    </el-form-item>
    <el-form-item label="地址標籤" prop="addressTags">
        <el-input class="form-input" v-model="formModel.addressTags" placeholder="請輸入地址標籤, 例: 家、公司、社區大樓等等"></el-input>
    </el-form-item>
    <el-form-item label="設為默認地址" prop="isDefault">
        <el-switch v-model="formModel.isDefault" :active-value="0" :inactive-value="1"></el-switch>
    </el-form-item>
    <el-form-item label-width="280px">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="confirmForm">確定</el-button>
    </el-form-item>
  </el-form>
</el-dialog>
</template>

<style lang="scss" scoped>
.form {
    .form-input {
        width: 320px;
        height: 50px;
    }
}
</style>