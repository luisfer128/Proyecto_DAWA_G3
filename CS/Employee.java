import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;

public class Employee
{ 
    private static final float SALARIO_BASE = 386;
    private float salario;
    private float porcentajeBono;
    private Employeetype tipoEmpleado;

    public enum Employeetype { Worker, Supervisor, Manager }

    public Employee(float salary, float bonusPercentage, Employeetype tipoEmpleado) {
        this.salario = salary;
        this.porcentajeBono = bonusPercentage;
        this.tipoEmpleado = tipoEmpleado;
    }
    
    //calcula el saLario dependiendo deL tipo de trabajador
    //y entrego eL dicimo correspondiente coda 2 mesas 
    public float calcularSalario(){
        Date fecha = new Date();
        LocalDate fechaLocal = fecha.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        int mes = fechaLocal.getMonthValue();
        float salarioCalculado = salario;
        float decimo = SALARIO_BASE / 12;
        
        if (mes % 2 == 0) {
            salarioCalculado += decimo;
        }

        switch (tipoEmpleado) {
            case Supervisor:
                salarioCalculado += porcentajeBono * 0.35F;
                break;
            case Manager:
                salarioCalculado += porcentajeBono * 0.7F;
                break;
            default:
                break;
        }
        return salarioCalculado;
    }
    
    //Calcula el bono de fn de año
    public float calcularBonoAnual(){
        float bono = 0.0F;
        switch (tipoEmpleado) {
            case Worker:
                bono = SALARIO_BASE;
                break;
            case Supervisor:
                bono = salario + SALARIO_BASE * 0.5F;
                break;
            case Manager:
                bono = salario + SALARIO_BASE * 1.0F;
                break;
        }
        return bono;
    } 
    
}

