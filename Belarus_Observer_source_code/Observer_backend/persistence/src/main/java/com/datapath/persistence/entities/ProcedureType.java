package com.datapath.persistence.entities;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "procedure_type", indexes = {
        @Index(columnList = "name_en", name = "name_en_idx"),
        @Index(columnList = "name_ru", name = "name_ru_idx")
})
@ToString(exclude = {"tenders"})
public class ProcedureType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name_en")
    private String nameEn;

    @Column(name = "name_ru")
    private String nameRu;

    @OneToMany(mappedBy = "procedureType")
    private List<Tender> tenders;

}
