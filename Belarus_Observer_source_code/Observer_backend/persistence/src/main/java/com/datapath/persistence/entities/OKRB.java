package com.datapath.persistence.entities;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "okrb",
        indexes = {
                @Index(columnList = "code", name = "okrb_code_idx"),
                @Index(columnList = "name", name = "okrb_name_idx")
        })

@ToString(exclude = {"classifications"})
public class OKRB {

    @Id
    private Long id;

    @Column(name = "code")
    private String code;

    @Column(name = "name", columnDefinition = "TEXT")
    private String name;

    @OneToMany(mappedBy = "okrb")
    private List<Classification> classifications;


}
