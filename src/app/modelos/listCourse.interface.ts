export interface ListCourseI {


    current_page: BigInteger;
    data: Array<Type>;


}

interface Type {
    id: BigInteger;
    c_name: string;
    c_description: string;
    c_period: string;
    c_numberStudent: BigInteger;
    c_date_initial: string;
    c_note_approved: BigInteger;
}
